import { redirect } from 'next/navigation';
import { getUserDetail } from '@apis';
import { USER_TYPE } from '@data';

export default async function Page() {
  try {
    const result = await getUserDetail();
    const userType = result?.data.userType;

    if (userType === USER_TYPE.CUSTOMER) {
      redirect('/customer');
    } else if (userType === USER_TYPE.INSTRUCTOR) {
      redirect('/manage');
    } else {
      redirect('/signin/type');
    }
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    redirect('/signin');
  }

  return null;
}
