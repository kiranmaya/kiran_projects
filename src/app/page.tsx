import Layout from '@/components/layout/Layout';
import PersonalInfo from '@/components/sections/PersonalInfo';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import { experiences, personalInfo, projects, skills } from '@/data/sampleData';
 
export default function Home() {
  return (
    <Layout>
      <PersonalInfo data={personalInfo} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Portfolio projects={projects} />
      <Contact personalInfo={{
        email: personalInfo.email,
        phone: personalInfo.phone,
        location: personalInfo.location,
        socialLinks: personalInfo.socialLinks
      }} />
    </Layout>
  );
}
