import SkillPageContent from '~/components/pages/SkillPageContent'
import type { Route } from './+types/skill'

export const meta = ({ params }: Route.MetaArgs) => {
    return [
        { title: '技術スタック' },
        {
            name: 'description',
            content: '技術スタックを表示します。',
        },
    ]
}

export default function Page() {
    return <SkillPageContent />
}
