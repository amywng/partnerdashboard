import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddForm from './AddForm';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState([]);
  const [updatedPartners, setUpdatedPartners] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:4000/partners', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then(data => {
      setPartners(data);
      setUpdatedPartners(false);
    })
    .catch((error) => {
      console.error('Error fetching partners', error);
    })
  }, [updatedPartners])

  return (
    <div id="main-content">
      <AddForm onTrigger={setUpdatedPartners}/>
      <div id="main-partners-grid">
        {partners.sort((a,b) => b.active - a.active).map((partner) => (
          <PartnerTile partnerData={partner} onTrigger={setUpdatedPartners}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;