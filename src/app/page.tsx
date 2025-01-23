import { ROUTES } from '@data';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(ROUTES.ONBOARDING.signin);
}
