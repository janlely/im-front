export interface Message {
    messageId: number,
    type: MessageType,
    data: string,
    sender: string
}

export interface Memeber {
    avatar?: string,
    username: string
}

export interface MessageDivData {
    message: Message
    send: boolean
    success: boolean
    uuid: number,
    failed: boolean,
    blob?: Blob,
    thumbnailUrl?: string
}
export enum MessageType {
    TEXT,
    IMAGE
}

export interface Emoji {
    name: string,
    native: string,
    emoji: string,
    unified: string,
    shortCodes: string
}