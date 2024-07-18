import { createClient } from '@supabase/supabase-js'
import questionData from "./questions.json" with { type: "json" };

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const seedData = async () => {
  // Step 1: Get the list ID lookup
  const listIDLookUp = {
    'Finance/Banking Data Engineer Study Plan': 18,
    'Top 50 Most Common Data Engineer Interview Questions': 19,
    'Pathway to FAANG': 20,
    'Amazon Data Engineer Study Plan': 21
  };

  // Step 2: Prepare the question data
  const formattedQuestionData = questionData.map(item => ({
    questionData: {
      question_title: item.Title,
      question_description: item.Question,
      tags: item.Tag,
      question_url: `${item['s3 Bucket']}${item['S3 object']}`,
      del_flag: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    listName: item.List
  }));

  console.log(`Prepared ${formattedQuestionData.length} questions for insertion`);

  // Step 3: Insert questions and create relations
  for (const item of formattedQuestionData) {
    try {
      // Insert the question
      const { data: insertedQuestion, error: insertError } = await supabase
        .from('interview_practice_questionmodel')
        .insert([item.questionData])
        .select();

      if (insertError) throw insertError;

      console.log(`Inserted question: ${item.questionData.question_title}`);

      // Find the corresponding list ID
      const listId = listIDLookUp[item.listName];

      if (!listId) {
        console.warn(`No matching list found for: ${item.listName}`);
        continue;  // Skip to the next question if no matching list is found
      }

      // Create the relation
      const { data: relation, error: relationError } = await supabase
        .from('interview_practice_questionlistmodel_questions')
        .insert([
          { questionlistmodel_id: listId, questionmodel_id: insertedQuestion[0].id }
        ])
        .select();

      if (relationError) throw relationError;

      console.log(`Created relation for question: ${item.questionData.question_title}`);

    } catch (error) {
      console.error(`Error processing question "${item.questionData.question_title}":`, error.message);
      // Continue with the next question even if there's an error
    }
  }

  console.log('Seeding completed');
};

seedData();