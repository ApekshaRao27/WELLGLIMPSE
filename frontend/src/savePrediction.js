import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path if needed

const savePredictionToFirebase = async (answers, label, riskScore) => {
  try {
    await addDoc(collection(db, 'questionnaireResponses'), {
      answers,
      predictedLabel: label,
      riskScore,
      timestamp: Timestamp.now()
    });
    console.log('✅ Prediction saved to Firebase');
  } catch (error) {
    console.error('❌ Error saving to Firebase:', error);
  }
};

export default savePredictionToFirebase;
