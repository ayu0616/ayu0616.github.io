import fs from 'node:fs'

import Markdown from 'react-markdown'

import { SkillChart } from '@/components/SkillChart/SkillChart'

const SkillPageContent = () => {
    const skillDescription = fs.readFileSync(
        'src/app/(navBar)/skill/skillDescription.md',
        'utf-8',
    )
    return (
        <div className="mx-auto flex h-[800px] w-dvw max-w-screen-lg flex-col gap-4 p-6">
            <div className="space-y-2 rounded-md border bg-white p-4">
                <Markdown>{skillDescription}</Markdown>
            </div>
            <div className="flex-1 rounded-md border bg-white">
                <SkillChart />
            </div>
        </div>
    )
}

export default SkillPageContent
