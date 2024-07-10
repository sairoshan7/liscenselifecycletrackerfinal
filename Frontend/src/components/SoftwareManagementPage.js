// // import React, { useState, useEffect, useRef } from 'react';
// // import SoftwareService from '../services/SoftwareService';
// // import { Link } from 'react-router-dom';

// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const SoftwareManagementPage = () => {
// //   const [newSoftware, setNewSoftware] = useState({
// //     softwareName: '',
// //     licenseKey: '',
// //     purchaseDate: '',
// //     expirationDate: '',
// //     supportEndDate: '',
// //     status: ''
// //   });
// //   const [softwares, setSoftwares] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [selectedSoftware, setSelectedSoftware] = useState(null);

// //   const form = useRef();

// //   useEffect(() => {
// //     fetchSoftwares();
// //   }, []);

// //   const fetchSoftwares = () => {
// //     //const token = localStorage.getItem('token');
// //     SoftwareService.getAllSoftware()
// //       .then(response => {
// //         setSoftwares(response);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching software:', error);
// //       });
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewSoftware({ ...newSoftware, [name]: value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     //const token = localStorage.getItem('token');
// //     SoftwareService.addSoftware(newSoftware)
// //       .then(() => {
// //         alert('Software added successfully');
// //         setNewSoftware({
// //           softwareName: '',
// //           licenseKey: '',
// //           purchaseDate: '',
// //           expirationDate: '',
// //           supportEndDate: '',
// //           status: ''
// //         });
// //         fetchSoftwares();
// //       })
// //       .catch(error => {
// //         console.error('Error adding software:', error);
// //         alert('An error occurred while adding software');
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   };

// //   const deleteSoftware = (softwareId) => {
// //     const confirmDelete = window.confirm('Are you sure you want to delete this software?');
// //     if (confirmDelete) {
// //       SoftwareService.deleteSoftware(softwareId)
// //         .then(() => {
// //           fetchSoftwares();
// //         })
// //         .catch(error => {
// //           console.error('Error deleting software:', error);
// //         });
// //     }
// //   };

// //   const fetchSoftwareById = async (softwareId) => {
// //     try {
// //       const software = await SoftwareService.getSoftwareById(softwareId);
// //       setSelectedSoftware(software);
// //     } catch (error) {
// //       console.error('Error fetching software by ID:', error);
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Software Management Page</h2>
// //       <div className="card card-container">
// //         <form onSubmit={handleSubmit} ref={form}>
// //           <div className="mb-3">
// //             <label htmlFor="softwareName" className="form-label">Software Name:</label>
// //             <input type="text" className="form-control" id="softwareName" name="softwareName" value={newSoftware.softwareName} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="licenseKey" className="form-label">License Key:</label>
// //             <input type="text" className="form-control" id="licenseKey" name="licenseKey" value={newSoftware.licenseKey} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="purchaseDate" className="form-label">Purchase Date:</label>
// //             <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" value={newSoftware.purchaseDate} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="expirationDate" className="form-label">Expiration Date:</label>
// //             <input type="date" className="form-control" id="expirationDate" name="expirationDate" value={newSoftware.expirationDate} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="supportEndDate" className="form-label">Support End Date:</label>
// //             <input type="date" className="form-control" id="supportEndDate" name="supportEndDate" value={newSoftware.supportEndDate} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="status" className="form-label">Status:</label>
// //             <select className="form-select" id="status" name="status" value={newSoftware.status} onChange={handleInputChange} required>
// //               <option value="">Select Status</option>
// //               <option value="Active">Active</option>
// //               <option value="Inactive">Inactive</option>
// //             </select>
// //           </div>
// //           <button type="submit" className="btn btn-primary" disabled={loading}>Add Software</button>
// //         </form>
// //       </div>

// //       <table className="table mt-4">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>License Key</th>
// //             <th>Purchase Date</th>
// //             <th>Expiration Date</th>
// //             <th>Support End Date</th>
// //             <th>Status</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {softwares.map(software => (
// //             <tr key={software.softwareId}>
// //               <td>{software.softwareId}</td>
// //               <td>{software.softwareName}</td>
// //               <td>{software.licenseKey}</td>
// //               <td>{software.purchaseDate}</td>
// //               <td>{software.expirationDate}</td>
// //               <td>{software.supportEndDate}</td>
// //               <td>{software.status}</td>
// //               <td>
// //                 <button className="btn btn-primary" onClick={() => fetchSoftwareById(software.softwareId)}>View</button>
// //                 <button className="btn btn-danger" onClick={() => deleteSoftware(software.softwareId)}>Delete</button>
// //                 {/* You can add a link to update software */}
// //                 <button><Link to={`/update-software/${software.softwareId}`}> Update</Link></button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {selectedSoftware && (
// //         <div>
// //           <h3>Selected Software Details:</h3>
// //           <p>Software Name: {selectedSoftware.softwareName}</p>
// //           <p>License Key: {selectedSoftware.licenseKey}</p>
// //           <p>Purchase Date: {selectedSoftware.purchaseDate}</p>
// //           <p>Expiration Date: {selectedSoftware.expirationDate}</p>
// //           <p>Support End Date: {selectedSoftware.supportEndDate}</p>
// //           <p>Status: {selectedSoftware.status}</p>
// //           {/* You can render other software details here */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SoftwareManagementPage;



// // import React, { useState, useEffect, useRef } from 'react';
// // import SoftwareService from '../services/SoftwareService';
// // import { Link } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const SoftwareManagementPage = () => {
// //   const [newSoftware, setNewSoftware] = useState({
// //     softwareName: '',
// //     licenseKey: '',
// //     purchaseDate: '',
// //     expirationDate: '',
// //     supportEndDate: '',
// //     status: ''
// //   });
// //   const [softwares, setSoftwares] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [selectedSoftware, setSelectedSoftware] = useState(null);

// //   const form = useRef();

// //   useEffect(() => {
// //     fetchSoftwares();
// //   }, []);

// //   const fetchSoftwares = () => {
// //     SoftwareService.getAllSoftware()
// //       .then(response => {
// //         setSoftwares(response);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching software:', error);
// //       });
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewSoftware({ ...newSoftware, [name]: value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     SoftwareService.addSoftware(newSoftware)
// //       .then(() => {
// //         alert('Software added successfully');
// //         setNewSoftware({
// //           softwareName: '',
// //           licenseKey: '',
// //           purchaseDate: '',
// //           expirationDate: '',
// //           supportEndDate: '',
// //           status: ''
// //         });
// //         fetchSoftwares();
// //       })
// //       .catch(error => {
// //         console.error('Error adding software:', error);
// //         alert('An error occurred while adding software');
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   };

// //   const deleteSoftware = (softwareId) => {
// //     const confirmDelete = window.confirm('Are you sure you want to delete this software?');
// //     if (confirmDelete) {
// //       SoftwareService.deleteSoftware(softwareId)
// //         .then(() => {
// //           fetchSoftwares();
// //         })
// //         .catch(error => {
// //           console.error('Error deleting software:', error);
// //         });
// //     }
// //   };

// //   const fetchSoftwareById = async (softwareId) => {
// //     try {
// //       const software = await SoftwareService.getSoftwareById(softwareId);
// //       setSelectedSoftware(software);
// //     } catch (error) {
// //       console.error('Error fetching software by ID:', error);
// //     }
// //   };

// //   const generateReport = () => {
// //     const header = ['ID', 'Name', 'License Key', 'Purchase Date', 'Expiration Date', 'Support End Date', 'Status'];
// //     const rows = softwares.map(software => [software.softwareId, software.softwareName, software.licenseKey, software.purchaseDate, software.expirationDate, software.supportEndDate, software.status]);

// //     const reportData = [header, ...rows];
// //     const csvContent = reportData.map(row => row.join(',')).join('\n');
// //     const blob = new Blob([csvContent], { type: 'text/csv' });
    
// //     const url = window.URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.setAttribute('download', 'software_report.csv');
// //     document.body.appendChild(link);
    
// //     link.click();
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Software Management Page</h2>
// //       <div className="card card-container">
// //         <form onSubmit={handleSubmit} ref={form}>
// //           <div className="mb-3">
// //             <label htmlFor="softwareName" className="form-label">Software Name:</label>
// //             <input type="text" className="form-control" id="softwareName" name="softwareName" value={newSoftware.softwareName} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="licenseKey" className="form-label">License Key:</label>
// //             <input type="text" className="form-control" id="licenseKey" name="licenseKey" value={newSoftware.licenseKey} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="purchaseDate" className="form-label">Purchase Date:</label>
// //             <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" value={newSoftware.purchaseDate} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="expirationDate" className="form-label">Expiration Date:</label>
// //             <input type="date" className="form-control" id="expirationDate" name="expirationDate" value={newSoftware.expirationDate} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="supportEndDate" className="form-label">Support End Date:</label>
// //             <input type="date" className="form-control" id="supportEndDate" name="supportEndDate" value={newSoftware.supportEndDate} onChange={handleInputChange} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="status" className="form-label">Status:</label>
// //             <select className="form-select" id="status" name="status" value={newSoftware.status} onChange={handleInputChange} required>
// //               <option value="">Select Status</option>
// //               <option value="Active">Active</option>
// //               <option value="Expired">Expired</option>
// //               <option value="Unsupported">Unsupported</option>
// //             </select>
// //           </div>
// //           <button type="submit" className="btn btn-primary" disabled={loading}>Add Software</button>
// //         </form>
// //       </div>

// //       <table className="table mt-4">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>License Key</th>
// //             <th>Purchase Date</th>
// //             <th>Expiration Date</th>
// //             <th>Support End Date</th>
// //             <th>Status</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {softwares.map(software => (
// //             <tr key={software.softwareId}>
// //               <td>{software.softwareId}</td>
// //               <td>{software.softwareName}</td>
// //               <td>{software.licenseKey}</td>
// //               <td>{software.purchaseDate}</td>
// //               <td>{software.expirationDate}</td>
// //               <td>{software.supportEndDate}</td>
// //               <td>{software.status}</td>
// //               <td>
// //                 <button className="btn btn-primary" onClick={() => fetchSoftwareById(software.softwareId)}>View</button>
// //                 <button className="btn btn-danger" onClick={() => deleteSoftware(software.softwareId)}>Delete</button>
// //                 <button><Link to={`/update-software/${software.softwareId}`}> Update</Link></button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {selectedSoftware && (
// //         <div>
// //           <h3>Selected Software Details:</h3>
// //           <p>Software Name: {selectedSoftware.softwareName}</p>
// //           <p>License Key: {selectedSoftware.licenseKey}</p>
// //           <p>Purchase Date: {selectedSoftware.purchaseDate}</p>
// //           <p>Expiration Date: {selectedSoftware.expirationDate}</p>
// //           <p>Support End Date: {selectedSoftware.supportEndDate}</p>
// //           <p>Status: {selectedSoftware.status}</p>
// //         </div>
// //       )}

// //       <button className="btn btn-success" onClick={generateReport}>Generate Report</button>
// //     </div>
// //   );
// // };

// // export default SoftwareManagementPage;

// import React, { useState, useEffect, useRef } from 'react';
// import SoftwareService from '../services/SoftwareService'; // Assuming this is the service for software CRUD operations
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'C:\\Users\\praveenkumar.sg\\Documents\\react-hooks-jwt-auth\\src\\SoftwareManagementPage.css';


// const SoftwareManagementPage = () => {
//   const [newSoftware, setNewSoftware] = useState({
//     softwareName: '',
//     licenseKey: '',
//     purchaseDate: '',
//     expirationDate: '',
//     supportEndDate: '',
//     status: ''
//   });
//   const [softwares, setSoftwares] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSoftware, setSelectedSoftware] = useState(null);
//   const [isDetailsVisible, setIsDetailsVisible] = useState(false);
//   const form = useRef();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSoftwares();
//   }, []);

//   const fetchSoftwares = () => {
//     SoftwareService.getAllSoftware()
//       .then(response => {
//         setSoftwares(response);
//       })
//       .catch(error => {
//         console.error('Error fetching softwares:', error);
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewSoftware({ ...newSoftware, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     SoftwareService.addSoftware(newSoftware)
//       .then(() => {
//         alert('Software added successfully');
//         setNewSoftware({
//           softwareName: '',
//           licenseKey: '',
//           purchaseDate: '',
//           expirationDate: '',
//           supportEndDate: '',
//           status: ''
//         });
//         fetchSoftwares();
//       })
//       .catch(error => {
//         console.error('Error adding software:', error);
//         alert('An error occurred while adding software');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const deleteSoftware = (softwareId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this software?');
//     if (confirmDelete) {
//       SoftwareService.deleteSoftware(softwareId)
//         .then(() => {
//           fetchSoftwares();
//         })
//         .catch(error => {
//           console.error('Error deleting software:', error);
//         });
//     }
//   };

//   const fetchSoftwareById = async (softwareId) => {
//     try {
//       const software = await SoftwareService.getSoftwareById(softwareId);
//       setSelectedSoftware(software);
//       setIsDetailsVisible(true);
//     } catch (error) {
//       console.error('Error fetching software by ID:', error);
//     }
//   };

//   const handleCloseDetails = () => {
//     setIsDetailsVisible(false);
//   };

//   const generateReport = () => {
//     const header = ['ID', 'Name', 'License Key', 'Purchase Date', 'Expiration Date', 'Support End Date', 'Status'];
//     const rows = softwares.map(software => [software.softwareId, software.softwareName, software.licenseKey, software.purchaseDate, software.expirationDate, software.supportEndDate, software.status]);
//     const reportData = [header, ...rows];
//     const csvContent = reportData.map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'software_report.csv');
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className="software-container">
//       <h2 className="software-page-title">Software Management Page</h2>
//       <div className="software-card-container">
//         <form onSubmit={handleSubmit} ref={form}>
//           <div className="software-form-group">
//             <label htmlFor="softwareName">Software Name:</label>
//             <input type="text" className="software-form-control" id="softwareName" name="softwareName" value={newSoftware.softwareName} onChange={handleInputChange} required />
//           </div>
//           <div className="software-form-group">
//             <label htmlFor="licenseKey">License Key:</label>
//             <input type="text" className="software-form-control" id="licenseKey" name="licenseKey" value={newSoftware.licenseKey} onChange={handleInputChange} required />
//           </div>
//           <div className="software-form-group">
//             <label htmlFor="purchaseDate">Purchase Date:</label>
//             <input type="date" className="software-form-control" id="purchaseDate" name="purchaseDate" value={newSoftware.purchaseDate} onChange={handleInputChange} required />
//           </div>
//           <div className="software-form-group">
//             <label htmlFor="expirationDate">Expiration Date:</label>
//             <input type="date" className="software-form-control" id="expirationDate" name="expirationDate" value={newSoftware.expirationDate} onChange={handleInputChange} required />
//           </div>
//           <div className="software-form-group">
//             <label htmlFor="supportEndDate">Support End Date:</label>
//             <input type="date" className="software-form-control" id="supportEndDate" name="supportEndDate" value={newSoftware.supportEndDate} onChange={handleInputChange} required />
//           </div>
//           <div className="software-form-group">
//             <label htmlFor="status">Status:</label>
//             <select className="software-form-control" id="status" name="status" value={newSoftware.status} onChange={handleInputChange} required>
//               <option value="">Select Status</option>
//               <option value="Active">Active</option>
//               <option value="Expired">Expired</option>
//               <option value="Unsupported">Unsupported</option>
//             </select>
//           </div>
//           <button type="submit" className="software-btn-primary" disabled={loading}>Add Software</button>
//         </form>
//       </div>

//       <table className="software-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>License Key</th>
//             <th>Purchase Date</th>
//             <th>Expiration Date</th>
//             <th>Support End Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {softwares.map(software => (
//             <tr key={software.softwareId}>
//               <td>{software.softwareId}</td>
//               <td>{software.softwareName}</td>
//               <td>{software.licenseKey}</td>
//               <td>{software.purchaseDate}</td>
//               <td>{software.expirationDate}</td>
//               <td>{software.supportEndDate}</td>
//               <td>{software.status}</td>
//               <td>
//                 <button className="software-btn-primary" onClick={() => fetchSoftwareById(software.softwareId)}>View</button>
//                 <button className="software-btn-danger" onClick={() => deleteSoftware(software.softwareId)}>Delete</button>
//                 <button className="software-btn-update">
//                   <Link to={`/update-software/${software.softwareId}`}>Update</Link>
//                 </button>           
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isDetailsVisible && selectedSoftware && (
//         <div className="software-selected-device-ticket">
//           <button className="software-close-btn" onClick={handleCloseDetails}>X</button>
//           <div className="software-selected-software-details">
//             <h3 className="software-ticket-title">Selected Software Details:</h3>
//             <div className="software-ticket-text">
//               <p><strong>Software Name:</strong> {selectedSoftware.softwareName}</p>
//               <p><strong>License Key:</strong> {selectedSoftware.licenseKey}</p>
//               <p><strong>Purchase Date:</strong> {selectedSoftware.purchaseDate}</p>
//               <p><strong>Expiration Date:</strong> {selectedSoftware.expirationDate}</p>
//               <p><strong>Support End Date:</strong> {selectedSoftware.supportEndDate}</p>
//               <p><strong>Status:</strong> {selectedSoftware.status}</p>
//             </div>
//           </div>
//         </div>
//       )}
//       <br></br>
//       <button className="software-btn-report" onClick={generateReport}>Generate Report</button>
//     </div>
//   );
// };

// export default SoftwareManagementPage;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceService from '../services/DeviceService';

const SoftwareManagementPage = () => {
  const initialSoftwareState = {
    softwareName: '',
    version: '',
    licenseKey: '',
    purchaseDate: '',
    expirationDate: '',
    supportEndDate: '',
    status: '',
    dateOfLastRenewal: ''
  };

  const [newSoftware, setNewSoftware] = useState(initialSoftwareState);
  const [deviceId, setDeviceId] = useState('');

  const handleSoftwareInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deviceId') {
      setDeviceId(value);
    } else {
      setNewSoftware(prevSoftware => ({
        ...prevSoftware,
        [name]: value
      }));
    }
  };

  const handleSubmitSoftware = (e) => {
    e.preventDefault();

    DeviceService.addSoftwareToDevice(deviceId, newSoftware)
      .then(() => {
        alert('Software added successfully');
        setNewSoftware(initialSoftwareState); // Resetting software state after successful addition
      })
      .catch(error => {
        console.error('Error adding software:', error);
        alert('An error occurred while adding software');
      });
  };

  return (
    <div className="container">
      <h2>Software Management Page</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmitSoftware}>
          <div className="mb-3">
            <label htmlFor="softwareName" className="form-label">Software Name:</label>
            <input type="text" className="form-control" id="softwareName" name="softwareName" value={newSoftware.softwareName} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="version" className="form-label">Version:</label>
            <input type="text" className="form-control" id="version" name="version" value={newSoftware.version} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseKey" className="form-label">License Key:</label>
            <input type="text" className="form-control" id="licenseKey" name="licenseKey" value={newSoftware.licenseKey} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="purchaseDate" className="form-label">Purchase Date:</label>
            <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" value={newSoftware.purchaseDate} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="expirationDate" className="form-label">Expiration Date:</label>
            <input type="date" className="form-control" id="expirationDate" name="expirationDate" value={newSoftware.expirationDate} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="supportEndDate" className="form-label">Support End Date:</label>
            <input type="date" className="form-control" id="supportEndDate" name="supportEndDate" value={newSoftware.supportEndDate} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status:</label>
            <select className="form-select" id="status" name="status" value={newSoftware.status} onChange={handleSoftwareInputChange} required>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfLastRenewal" className="form-label">Date of Last Renewal:</label>
            <input type="date" className="form-control" id="dateOfLastRenewal" name="dateOfLastRenewal" value={newSoftware.dateOfLastRenewal} onChange={handleSoftwareInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="deviceId" className="form-label">Device ID:</label>
            <input type="text" className="form-control" id="deviceId" name="deviceId" value={deviceId} onChange={handleSoftwareInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Software</button>
        </form>
      </div>
    </div>
  );
};

export default SoftwareManagementPage;
