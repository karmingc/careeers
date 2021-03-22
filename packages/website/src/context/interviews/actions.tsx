import axios from 'axios';
import { ApiRouteName, apiRoutes } from 'routes/apiRoutes';

export async function fetchInterview({ slug }: { slug: string }) {
  const [interview] = await Promise.all([
    axios.get(
      `${apiRoutes({ apiRouteName: ApiRouteName.INTERVIEWS_SLUG })}${slug}`
    )
  ]);
  return [interview];
}
