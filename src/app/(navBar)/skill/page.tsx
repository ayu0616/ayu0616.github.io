import { getMetadata } from '@/util/metadata'

import SkillPageContent from './SkillPageContent'

export const metadata = getMetadata({
    title: '技術スタック',
    url: 'https://ayu0616.github.io/skill',
})

export default function Page() {
    return <SkillPageContent />
}
