export interface IConversation {
  startConversation: (id: string) => void;
  id: string;
  name: string;
  lastMessage: string;
  avatar?: string;
}

export interface IConversationId {
  me: string;
  you: string;
}
