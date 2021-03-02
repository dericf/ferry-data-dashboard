import Link from 'next/link'
import { Button } from "@/components/Button";
import { MainTitle } from "@/components/Headings/MainTitle";
import { Layout } from "@/components/Layout";
import {Filter} from "@/components/Filter"
import { useRouter } from 'next/router';
import { PredictionResults } from '@/components/PredictionResults';

export default function index() {
  const router = useRouter();
  return (
    <Layout>
      <Button onClick={() => router.push('/dashboard')} color="blue" className="fixed top-4 right-4">Admin Dashboard</Button>
      <MainTitle>Ferry App</MainTitle>
      
      <Filter />

      <PredictionResults />
      
    </Layout>
  );
}
