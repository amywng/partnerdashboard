import { useState } from 'react';

function AddForm({onTrigger}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(false);
    const [logo, setLogo] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('active', active);
        if (logo) {
            formData.append('logo', logo);
        }

        try {
            const response = await fetch('http://localhost:4000/submit', {
                method: 'POST',
                body: formData,
            });

            const element = document.getElementById('logo');
            if (response.ok) {
                alert('Partner added successfully!');
                setName('');
                element.value = null;
                setDescription('');
                setActive(false);
                onTrigger(true);
            } else {
                alert('Error adding partner response');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding partner catch', error);
        }
    };

    const handleLogoChange = (event) => {
        setLogo(event.target.files[0]);
    };

    return (
        <div className="add-form">
            
            <form onSubmit={handleSubmit}>
                <div className = "form-title">
                    <h3>Add Partner Info</h3>
                </div>
                <div>
                    <label htmlFor="name">Partner Name</label>
                    <br/>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="description">Partner Description</label>
                    <br/>
                    <input 
                        type="text" 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="logo">Parner Logo</label>
                    <br/>
                    <input 
                        type="file" 
                        id="logo"
                        accept="image/*" 
                        onChange={handleLogoChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="active">Active?</label>
                    <br/>
                    <input 
                        type="checkbox" 
                        id="active" 
                        checked={active} 
                        onChange={(e) => setActive(e.target.checked)} 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddForm;