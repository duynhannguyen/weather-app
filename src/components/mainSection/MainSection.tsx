import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode } from 'react';

type MainSectionProps = {
  children: ReactNode;
};

const MainSection = ({ children }: MainSectionProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://api.openweathermap.org/data/2.5/forecast?q=hanoi&appid=223fb149adbee9c73fc4a0da11f3a832&cnt=56'
      );
      return data;
    },
  });
  console.log('data', data);
  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return <main className="main-container">{children}</main>;
};

export default MainSection;
