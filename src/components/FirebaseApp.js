//import firestore from "@react-native-firebase/firestore"
//
//const userDocument = await firestore().collection("Users").doc('5QFtCZuPcKrgJdD88AZe').get()
//
//
//const FirebaseApp = () => {
//    const [userDocument, setUserDocument] = useState(null);
//
//    useEffect(() => {
//        const getUser = async () => {
//          try {
//            const userDoc = await firestore().collection('users').doc('your_user_id_here').get();
//            setUserDocument(userDoc);
//            console.log(userDoc);
//          } catch (error) {
//            console.error(error);
//          }
//        };
//
//        getUser();
//      }, []);
//}