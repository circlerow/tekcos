export interface IConversation {
  startConversation: (id: string) => void;
  id: string;
  name: string;
  lastMessage: string;
}

export interface IConversationId {
  me: string;
  you: string;
}
