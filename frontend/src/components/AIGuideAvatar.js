import { Player } from '@lottiefiles/react-lottie-player';
import doctorAnimation from '../assets/animations/Doctor.json'


const DoctorAnimation = () => (
<Player
  autoplay
  loop
  src={doctorAnimation}
  style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
/>

)

export default DoctorAnimation

