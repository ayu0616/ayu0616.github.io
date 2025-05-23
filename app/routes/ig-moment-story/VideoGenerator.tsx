import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { Loader2Icon, Share2Icon } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'

interface ImageUploaderProps {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ handleImageChange }) => (
    <div className="space-y-2">
        <Label
            htmlFor="image-upload"
            className="block font-medium text-gray-700 text-sm"
        >
            画像選択
        </Label>
        <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full rounded border bg-white p-0 text-gray-500 text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 file:text-sm hover:file:bg-blue-100"
        />
    </div>
)

interface ColorPickerProps {
    bgColor: string
    setBgColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker: React.FC<ColorPickerProps> = ({ bgColor, setBgColor }) => (
    <div className="space-y-2">
        <label
            htmlFor="bg-color"
            className="block font-medium text-gray-700 text-sm"
        >
            背景色
        </label>
        <div className="flex items-center gap-2">
            <Input
                type="color"
                id="bg-color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-12 w-12 cursor-pointer rounded bg-white p-1 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
            />
            <Input
                type="text"
                value={bgColor}
                onChange={(e) => {
                    const value = e.target.value
                    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                        setBgColor(value)
                    } else if (
                        value === '' ||
                        /^#[0-9A-Fa-f]{0,6}$/.test(value)
                    ) {
                        setBgColor(value)
                    }
                }}
                className={cn(
                    'w-32 rounded-md border bg-white px-3 py-2 font-mono text-sm focus:ring-2',
                    /^#[0-9A-Fa-f]{6}$/.test(bgColor)
                        ? 'border-gray-300 focus:ring-blue-500'
                        : 'border-red-500 focus:ring-red-500',
                )}
                placeholder="#FFFFFF"
                maxLength={7}
            />
        </div>
    </div>
)

interface ActionButtonsProps {
    isValidInput: boolean
    generating: boolean
    loaded: boolean
    videoUrl: string | null
    generateVideo: () => void
    downloadVideo: () => void
    handleShare: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    isValidInput,
    generating,
    loaded,
    videoUrl,
    generateVideo,
    downloadVideo,
    handleShare,
}) => (
    <div className="flex flex-wrap gap-4">
        <button
            onClick={generateVideo}
            disabled={!isValidInput || generating || !loaded}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
        >
            {generating ? (
                <span className="flex items-center gap-2">
                    <Loader2Icon className="h-5 w-5 animate-spin text-white" />
                    生成中...
                </span>
            ) : (
                '動画生成'
            )}
        </button>
        {videoUrl && (
            <>
                <button
                    onClick={downloadVideo}
                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                    type="button"
                >
                    ダウンロード
                </button>
                <button
                    onClick={handleShare}
                    className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                    type="button"
                >
                    <span className="flex items-center gap-2">
                        <Share2Icon className="size-5" />
                        共有
                    </span>
                </button>
            </>
        )}
    </div>
)

interface ProgressDisplayProps {
    progress: number
    status: string
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
    progress,
    status,
}) => (
    <div className="space-y-2">
        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
        <div className="flex justify-between text-sm">
            <span className="text-gray-600">{status}</span>
            <span className="font-medium text-blue-600">
                {Math.round(progress)}%
            </span>
        </div>
    </div>
)

interface FFmpegLogDisplayProps {
    messageRef: React.RefObject<HTMLParagraphElement | null>
}

const FFmpegLogDisplay: React.FC<FFmpegLogDisplayProps> = ({ messageRef }) => (
    <div className="rounded-lg border bg-white p-4">
        <pre className="overflow-x-auto font-mono text-gray-600 text-sm">
            <code ref={messageRef}>準備完了</code>
        </pre>
    </div>
)

interface VideoPreviewProps {
    videoUrl: string | null
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
    const videoRef = useCallback(
        (element: HTMLVideoElement | null) => {
            if (!(element && videoUrl)) {
                return
            }

            const handleCanPlay = () => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
                element.removeEventListener('canplay', handleCanPlay)
            }

            element.addEventListener('canplay', handleCanPlay)

            return () => {
                element.removeEventListener('canplay', handleCanPlay)
            }
        },
        [videoUrl],
    )

    if (!videoUrl) {
        return null
    }

    return (
        <div className="w-full space-y-4">
            <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="mx-auto aspect-[9/16] max-h-[50vh] rounded-lg shadow-lg"
                muted
                playsInline
            />
        </div>
    )
}

const VideoGenerator: React.FC = () => {
    const [image, setImage] = useState<File | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [generating, setGenerating] = useState<boolean>(false)
    const [bgColor, setBgColor] = useState<string>('#ffffff')
    const [progress, setProgress] = useState<number>(0)
    const [status, setStatus] = useState<string>('準備完了')
    const ffmpegRef = useRef(new FFmpeg())
    const messageRef = useRef<HTMLParagraphElement>(null)

    const isValidInput = !!image && /^#[0-9A-Fa-f]{6}$/.test(bgColor)

    const parseLog = useCallback((message: string) => {
        if (message.includes('Opening')) {
            setStatus('初期化中...')
        } else if (message.includes('frame=')) {
            setStatus('変換処理中...')
        } else if (message.includes('muxing overhead')) {
            setStatus('最終化処理中...')
        }

        if (messageRef.current) {
            messageRef.current.innerHTML = message
        }
    }, [])

    const load = useCallback(async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
        const ffmpeg = ffmpegRef.current
        await ffmpeg.load({
            coreURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.js`,
                'text/javascript',
            ),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                'application/wasm',
            ),
        })
        setLoaded(true)
    }, [])

    useEffect(() => {
        load()
    }, [load])

    useEffect(() => {
        const ffmpeg = ffmpegRef.current
        const onLog = ({ message }: { message: string }) => {
            parseLog(message)
        }
        ffmpeg.on('log', onLog)
        return () => {
            ffmpeg.off('log', onLog)
        }
    }, [parseLog])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
        }
    }

    const generateVideo = async () => {
        setProgress(0)
        setStatus('処理を開始しています...')
        if (!image) {
            return
        }

        setGenerating(true)

        const ffmpeg = ffmpegRef.current

        try {
            const filename = image.name

            await ffmpeg.writeFile(filename, await fetchFile(image))

            await ffmpeg.exec([
                '-i',
                filename,
                '-frames:v',
                '1',
                '-c:v',
                'libx264',
                '-preset',
                'ultrafast',
                '-tune',
                'stillimage',
                '-pix_fmt',
                'yuv420p',
                '-vf',
                `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:${bgColor}`,
                '-r',
                '120',
                'video.mp4',
            ])

            setProgress(100)
            setStatus('処理完了')
            const data = await ffmpeg.readFile('video.mp4')

            if (typeof data === 'string') {
                throw new Error('Data is not a blob')
            }

            const url = URL.createObjectURL(
                new Blob([data.buffer], { type: 'video/mp4' }),
            )

            setVideoUrl(url)
        } catch (error) {
            setStatus('エラーが発生しました')
            setProgress(0)
        } finally {
            setGenerating(false)
        }
    }

    const downloadVideo = () => {
        if (!videoUrl) {
            return
        }

        const a = document.createElement('a')
        a.href = videoUrl
        a.download = 'video.mp4'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(videoUrl)
    }

    const handleShare = useCallback(async () => {
        if (!videoUrl) {
            return
        }

        try {
            const response = await fetch(videoUrl)
            const blob = await response.blob()
            const file = new File([blob], 'video.mp4', { type: 'video/mp4' })

            if (
                navigator.share &&
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {
                await navigator.share({
                    title: 'Instagramストーリー瞬間保存動画',
                    files: [file],
                })
            } else {
                await navigator.clipboard.writeText(videoUrl)
                toast.success('動画URLをクリップボードにコピーしました！')
            }
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return
            }
            toast.error('動画の共有に失敗しました。')
        }
    }, [videoUrl])

    return (
        <div className="mx-auto max-w-2xl space-y-6 p-2 md:p-6">
            <div className="space-y-6">
                <ImageUploader handleImageChange={handleImageChange} />
                <ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
            </div>

            <ActionButtons
                isValidInput={isValidInput}
                generating={generating}
                loaded={loaded}
                videoUrl={videoUrl}
                generateVideo={generateVideo}
                downloadVideo={downloadVideo}
                handleShare={handleShare}
            />

            <ProgressDisplay progress={progress} status={status} />
            <FFmpegLogDisplay messageRef={messageRef} />
            <VideoPreview videoUrl={videoUrl} />
        </div>
    )
}

export default VideoGenerator
