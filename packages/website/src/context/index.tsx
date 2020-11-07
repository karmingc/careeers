import React from 'react';
import { ResumesProvider } from './resumes';

export const ContextProviders: React.FC = ({ children }) => (
  <ResumesProvider>{children}</ResumesProvider>
);
