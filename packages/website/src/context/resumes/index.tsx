import React, { useState } from 'react';

interface ResumesActionProps {
  page: number;
}

interface ResumesContextProps {
  children: React.ReactNode;
}

const INITIAL_RESUMES_STATE = {
  page: 1
};

export const ResumesContext = React.createContext(INITIAL_RESUMES_STATE);

export let dispatchResumesActions: React.Dispatch<ResumesActionProps>;

/**
 * Context provider for Resumes
 * @param param0
 */
export const ResumesProvider: React.FC<ResumesContextProps> = ({
  children
}) => {
  const [resumesState, setResumesState] = useState(INITIAL_RESUMES_STATE);

  dispatchResumesActions = setResumesState;

  return (
    <ResumesContext.Provider value={resumesState}>
      {children}
    </ResumesContext.Provider>
  );
};
