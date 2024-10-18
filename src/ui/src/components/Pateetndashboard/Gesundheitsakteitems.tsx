import React from 'react';
import "./pdashboard.css";



const Gesundheitsdaten: React.FC = () => {

    const krankengeschichte = 'Hier steht die Krankengeschichte...';
    const medikamente = ['Aspirin', 'Ibuprofen', 'Paracetamol'];
    const allergien = ['Nüsse', 'Erdnüsse', 'Milch'];
    const labortests = [
        { title: 'Blutzucker', description: 'Der Blutzuckerspiegel liegt bei 120 mg/dl' },
        { title: 'Cholesterin', description: 'Der Cholesterinspiegel liegt bei 200 mg/dl' },
    ];

  return (
    <div className='Gesdiv'>  
    <header>
        <h1>Gesundheitsdaten</h1>
    </header>
    <main>
      
        <section>
            
            <ul>
                        <li>
                            <h3>Krankengeschichte</h3>
                            <p>{krankengeschichte}</p>
                        </li>
                        <li>
                            <h3>Medikamentenliste</h3>
                            <ul className='ulitems'>
                                {medikamente.map((medikament, index) => (
                                    <li key={index} >{medikament}</li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <h3>Allergien</h3>
                    
                            <ul className='ulitems'>
                                {allergien.map((allergie, index) => (
                                    <li key={index}>{allergie}</li>
                                ))}
                            </ul>
                      
                        </li>
                        <li>
                            <h3>Laborergebnisse und Diagnosen</h3>
                            <ul className='ulitemss'>
                                {labortests.map((test, index) => (
                                    <li key={index}>
                                        <strong>{test.title}</strong>: {test.description}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
        </section>
    </main>

</div>
      
  );
};

export default Gesundheitsdaten;