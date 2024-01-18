export interface IMessage {
  message: string;
  avatar?:string;
}

export interface IMessageConversation {
  message: string;
  time: string;
  isMine: boolean;
}
