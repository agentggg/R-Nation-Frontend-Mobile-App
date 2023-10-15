import axios from 'axios';

const ErrorReport = async (deviceInfo) => {
  try {
    // const response = await axios.post(`${IP_ADDRESS}`, deviceInfo);
    // Handle successful response if needed
    console.log('Error report sent successfully:', deviceInfo);
    // console.log('Error report sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending error report:', error);
  }
};

export default ErrorReport;
