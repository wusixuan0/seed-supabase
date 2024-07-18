import { createClient } from '@supabase/supabase-js'
import questionListData from "./question_list.json" with { type: "json" };

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const avatarURL = "https://odgdkbljdycibqmdlxgo.supabase.co/storage/v1/object/public/bravelii_app/icons/question_list_icon.png"

const formattedData = questionListData.map(item => ({
  question_list_name: item.question_list_name,
  question_list_description: item.question_list_description,
  question_list_avatar: avatarURL,
  is_default: item.is_default,
  del_flag: false,
  created_at: new Date(),
  updated_at: new Date()
}))

const insertQuestionListData = async () => {
  const { data, error } = await supabase
    .from('interview_practice_questionlistmodel')
    .insert(formattedData)

  if (error) console.log('Error inserting data sob:', error.message)
  else console.log('Data inserted successfully:', data)
}

////////////////////////
const getData = async () => {
  const { data, error } = await supabase
  .from('interview_practice_questionlistmodel')
  .select('*')
  if (error) console.log('Error inserting data sob:', error.message)
  else console.log('interview_practice_questionlistmodel:', data)
}
getData()
const insertData = async () => {
  const { data, error } = await supabase
    .from('interview_practice_questionlistmodel')
    .select('id')
    .eq('question_list_name', 'value');

  if (error) {
    console.log(error);
  } else {
    const { id } = data[0];
    const { data: newData, error: newError } = await supabase
      .from('interview_practice_questionmodel')
      .insert([{ column1: 'value1', column2: 'value2', questionlistmodel_id: id }]);

    if (newError) {
      console.log(newError);
    } else {
      console.log(newData);
    }
  }
}