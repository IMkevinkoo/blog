import { Post } from '../types';

export const posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    excerpt: 'Explore the new features in React 19, including the new compiler, Actions API, and more.',
    content: `
# Getting Started with React 19

React 19 is finally here, and it brings a lot of exciting changes to the table. In this post, we'll dive into the most significant updates and how they can improve your development workflow.

## The React Compiler

One of the most anticipated features is the React Compiler. It automatically optimizes your code, reducing the need for manual memoization with \`useMemo\` and \`useCallback\`.

## Actions API

The new Actions API simplifies data handling and state updates, making it easier to manage asynchronous operations in your components.

\`\`\`tsx
async function updateName(name: string) {
  const error = await performUpdate(name);
  if (error) {
    return error;
  }
  redirect("/path");
}
\`\`\`

## New Hooks

React 19 introduces several new hooks like \`useActionState\`, \`useFormStatus\`, and \`useOptimistic\`. These hooks provide better ways to handle form states and optimistic UI updates.

Stay tuned for more in-depth tutorials on each of these features!
    `,
    author: 'Jane Doe',
    date: '2024-03-15',
    category: 'React',
    image: 'https://picsum.photos/seed/react/800/400',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS 4.0',
    excerpt: 'Tailwind CSS 4.0 is a major leap forward. Learn about the new engine and simplified configuration.',
    content: `
# Mastering Tailwind CSS 4.0

Tailwind CSS 4.0 introduces a brand-new engine built for speed and flexibility. Let's look at what's new.

## Zero-config Setup

With the new engine, you can get started with Tailwind CSS without a configuration file in many cases. It automatically detects your files and generates the necessary CSS.

## Better Performance

The new engine is significantly faster, especially in large projects. It uses a more efficient way to scan your files and generate styles.

## New Utilities

Tailwind 4.0 adds several new utility classes and improves existing ones, giving you even more control over your designs.

Try it out today and see the difference!
    `,
    author: 'John Smith',
    date: '2024-03-10',
    category: 'CSS',
    image: 'https://picsum.photos/seed/tailwind/800/400',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    excerpt: 'What does the future hold for web developers? We discuss AI, edge computing, and more.',
    content: `
# The Future of Web Development

The web development landscape is constantly evolving. Here are some trends that we believe will shape the future of the web.

## AI-Driven Development

AI is becoming an integral part of the development process, from code generation to automated testing and optimization.

## Edge Computing

Edge computing allows you to run your code closer to your users, resulting in faster load times and better performance.

## Serverless Architecture

Serverless continues to gain popularity, enabling developers to focus on writing code without worrying about infrastructure management.

What are your thoughts on the future of the web? Let us know in the comments!
    `,
    author: 'Alice Johnson',
    date: '2024-03-05',
    category: 'Trends',
    image: 'https://picsum.photos/seed/future/800/400',
    readTime: '6 min read'
  }
];
