export interface IConversation {
  startConversation: (id: string) => void;
  id: string;
  name: string;
}

export interface IConversationId {
  me: string;
  you: string;
}
