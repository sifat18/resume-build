import axios from 'axios';
import exportFromJSON from 'export-from-json';
import {
  useActivities,
  useAwards,
  useEducation,
  useIntro,
  useSkills,
  useVolunteer,
  useWork,
} from 'src/stores/data.store';
import { getIcon } from 'src/styles/icons';
import styled from 'styled-components';

const IconWrapper = styled.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`;

export function SaveSettings() {
  const basics = useIntro((state: any) => state.intro);
  const skills = useSkills((state: any) => state);
  const work = useWork((state: any) => state.companies);
  const education = useEducation((state: any) => state.education);
  const activities = useActivities((state: any) => state);
  const volunteer = useVolunteer((state: any) => state.volunteer);
  const awards = useAwards((state: any) => state.awards);

  async function save() {
    const fileName = basics.name + '_' + new Date().toLocaleString();
    const exportType = exportFromJSON.types.json;
    let email: String = basics.email;
    console.log(email);
    let data: Object = { basics, skills, work, education, activities, volunteer, awards };
    await axios
      .put(`https://fierce-woodland-01411.herokuapp.com/api/resume/${email}`, data)
      .then((res) => (res.data ? console.log(res.data) : console.log('cant')));

    exportFromJSON({
      data: { basics, skills, work, education, activities, volunteer, awards },
      fileName,
      exportType,
    });
  }

  return (
    <IconWrapper>
      <IconButton onClick={save}>{getIcon('save')}</IconButton>
    </IconWrapper>
  );
}
