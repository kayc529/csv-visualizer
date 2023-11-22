import CsvResults from '@/components/csv-results';
import UploadFileForm from '@/components/upload-file-form';

export default function Home() {
  return (
    <main className='w-full min-h-screen p-8 flex flex-col items-center'>
      <UploadFileForm />
      <CsvResults />
    </main>
  );
}
