import axios from 'axios';
import { dispatchResumesActions } from '.';
import { ApiRouteName, apiRoutes } from 'routes/apiRoutes';

export function updateResumesFeedPage({ page }: { page: number }) {
  dispatchResumesActions({ page });
}

export async function fetchResume({ slug }: { slug: string }) {
  const [resume, relatedResumes] = await Promise.all([
    axios.get(
      `${apiRoutes({ apiRouteName: ApiRouteName.RESUMES_SLUG })}${slug}`
    ),
    axios.get(
      `${apiRoutes({ apiRouteName: ApiRouteName.RESUMES_RELATED })}${slug}`
    )
  ]);
  return [resume, relatedResumes];
}
