import CsvResults from '@/components/csv-results';
import UploadFileForm from '@/components/upload-file-form';

export default function Home() {
  return (
    <main className='container min-h-screen mx-auto p-8 flex flex-col items-center'>
      <UploadFileForm />
      <CsvResults />
    </main>
  );
}
