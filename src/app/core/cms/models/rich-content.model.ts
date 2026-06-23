export interface TiptapMark {
  type: 'bold' | 'italic' | 'pseudoHeading';
  attrs?: Record<string, any>;
}

export interface TiptapNode {
  type: 'doc' | 'paragraph' | 'bulletList' | 'orderedList' | 'listItem' | 'text' | 'hardBreak';
  text?: string;
  marks?: TiptapMark[];
  content?: TiptapNode[];
}
