import { createClient } from '@supabase/supabase-js'
import gradingData from "./grading_criteria.json" with { type: "json" };

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const updateGradingCriteria = async () => {
    for (const [title, criteria] of Object.entries(gradingData)) {
      console.log(`Processing: ${title}`);
  
      const { data, error } = await supabase
        .from('interview_practice_questionmodel')
        .select('id')
        .eq('question_title', title);
  
      if (error) {
        console.log(`Error fetching question with title "${title}":`, error.message);
      } else if (data && data.length > 0) {
        const { error: updateError } = await supabase
          .from('interview_practice_questionmodel')
          .update({ question_grading_criteria: criteria })
          .eq('id', data[0].id);
  
        if (updateError) {
          console.log(`Error updating grading criteria for "${title}":`, updateError.message);
        } else {
          console.log(`Updated grading criteria for "${title}"`);
        }
      } else {
        console.log(`No matching question found for title: "${title}"`);
      }
    }
  
    console.log('Grading criteria update process completed');
}
  
  updateGradingCriteria();

