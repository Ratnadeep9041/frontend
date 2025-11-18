'use client';

import ReactMarkdownLib from 'react-markdown';

interface ReactMarkdownProps {
  children: string;
  className?: string;
}

const markdownComponents = {
  h1: ({ node, ...props }: any) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-base font-bold mt-2 mb-1" {...props} />,
  p: ({ node, ...props }: any) => <p className="mb-2 leading-relaxed" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
  li: ({ node, ...props }: any) => <li className="text-sm" {...props} />,
  code: ({ node, inline, ...props }: any) =>
    inline ? (
      <code className="bg-gray-200 px-1 rounded text-xs font-mono" {...props} />
    ) : (
      <code className="block bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2" {...props} />
    ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-2" {...props} />
  ),
  a: ({ node, ...props }: any) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-bold text-gray-900" {...props} />,
  em: ({ node, ...props }: any) => <em className="italic text-gray-700" {...props} />,
  hr: ({ node, ...props }: any) => <hr className="my-4 border-gray-300" {...props} />,
};

export function ReactMarkdown({ children, className }: ReactMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdownLib components={markdownComponents}>
        {children}
      </ReactMarkdownLib>
    </div>
  );
}