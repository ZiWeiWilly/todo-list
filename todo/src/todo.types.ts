export type Todo = {
    title: string
    content: string
    due: string
    place: string
    flag: string
    priority: 'Low' | 'Middle' | 'High'
    isCompleted: boolean
}