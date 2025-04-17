// postToRealtimeDB.js
import axios from 'axios';

const postToCategoryList = async (newCategory) => {
  try {
    console.log("🚀 Adding new category:", newCategory);

    const res = await axios.get('https://your-project-id-default-rtdb.firebaseio.com/catagerious.json');
    const existing = res.data || [];

    const newId = existing.length > 0
      ? existing[existing.length - 1].id + 1
      : 1;

    const updated = [...existing, { ...newCategory, id: newId }];

    await axios.put('https://bnews-4833f-default-rtdb.firebaseio.com/catagerious.json', updated);
    console.log(updated)

    console.log("✅ Category added successfully!");
  } catch (err) {
    console.error("❌ Error adding category:", err);
  }
};

export default postToCategoryList;
