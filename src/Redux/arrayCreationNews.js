// // getFromRealtimeDB.js
// import axios from 'axios';

// const getNewsFromRealtimeDB = async () => {
//   try {
//     const res = await axios.get('https://bnews-4833f-default-rtdb.firebaseio.com/news.json');
//     const raw = res.data;

//     // ✅ Ensure we return an array, even if Firebase gives an object
//     if (Array.isArray(raw)) return raw;

//     // Convert object to array if needed (for older Firebase entries)
//     const formatted = Object.values(raw || {});
//     console.log("📥 Fetched and formatted data:", formatted);
//     return formatted;
//   } catch (error) {
//     console.error("❌ Error fetching data:", error);
//     return [];
//   }
// };

// export default getNewsFromRealtimeDB;
