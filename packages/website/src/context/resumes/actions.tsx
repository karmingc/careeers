import { dispatchResumesActions } from '.';

export function updateResumesFeedPage({ page }: { page: number }) {
  dispatchResumesActions({ page });
}
