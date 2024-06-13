import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddForm from './AddForm';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState([]);
  const [addedPartner, setAddedPartner] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:4000/partners', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then(data => {
      setPartners(data);
      setAddedPartner(false);
    })
    .catch((error) => {
      console.error('Error fetching partners', error);
    })
  }, [addedPartner])

  return (
    <div id="main-content">
      <AddForm onTrigger={setAddedPartner}/>
      <div id="main-partners-grid">
        {partners.sort((a,b) => b.active - a.active).map((partner) => (
          <PartnerTile partnerData={partner} onTrigger={setAddedPartner}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;