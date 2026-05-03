export type Framework = 'react' | 'vue' | 'html'
export type Styling = 'tailwind' | 'css' | 'none' | 'bootstrap' | 'scss'

export interface GenerateRequest {
    prompt: string
    framework: Framework
    styling: Styling
    currentCode?: string
}
