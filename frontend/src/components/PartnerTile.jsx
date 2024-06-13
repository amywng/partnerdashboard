import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information:
  organization's name, logo, description, currently actively working with them or not
*/

function PartnerTile({ partnerData, onTrigger }) {

  const { name, description, active, logo } = partnerData;
  const partnerClass = active ? 'active': 'inactive';
  const badge = active ? 'Active' : 'Inactive';

  const handleDelete = async () => {
    try {
      const data = {'name':name};
      const response = await fetch('http://localhost:4000/delete', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": 'application/json'
        },
      });

      if (response.ok) {
        alert('Item deleted');
        onTrigger(true);
      } else {
        alert('Failed to delete response');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete');
    }
  };

  return (
    <div className={`partner-tile ${partnerClass}`}>
      <div className="image-div">
        <img className="partner-thumbnail" src={logo} alt = {`${name} Thumbnail`} />
      </div>
      <div className="partner-info">
        <h3>{name}<br/><span className="badge">{badge}</span></h3>
        <p>{description}</p>
        <button className="delete" 
        type="button" 
        onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default PartnerTile;