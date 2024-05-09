import { Metadata } from 'next'

import { generateTitle } from '@/util/metadata'

import SkillPageContent from './SkillPageContent'

export const metadata: Metadata = {
    title: generateTitle('技術スタック'),
}

export default function Page() {
    return <SkillPageContent />
}
