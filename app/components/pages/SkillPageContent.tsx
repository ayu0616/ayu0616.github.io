import Markdown from 'react-markdown'

import { SkillChart } from 'app/components/SkillChart/SkillChart'

const SkillPageContent = () => {
    const skillDescription = `## 技術スタック

- 軸
    - 縦軸 ： 技術スタック
    - 横軸 ： 技術スタックを使用していた期間
- 棒グラフの棒をクリックすると、対応した技術スタックの詳細ページに遷移
`
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
