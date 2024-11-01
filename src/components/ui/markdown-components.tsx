export const markdownComponents = {
  h1: ({ node, ...props }) => (
    <h1
      className="text-2xl tracking-wide text-gray-300 font-bold my-4"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="text-xl tracking-wide text-gray-300 font-semibold my-4"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="text-md tracking-wide text-gray-300 font-medium my-4"
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <p className="text-sm tracking-wide text-gray-300" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }) => (
    <code className="bg-gray-800 text-pink-500 px-2 py-1 rounded-md" {...props}>
      {children}
    </code>
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="text-sm tracking-wide text-gray-300 list-disc list-inside my-2"
      {...props}
    />
  ),
  li: ({ node, ...props }) => <li className="my-1" {...props} />,
};
