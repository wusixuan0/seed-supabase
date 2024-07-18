import { createClient } from '@supabase/supabase-js'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function fixUrl(originalUrl) {
  // Remove the 's3://' prefix
  let newUrl = originalUrl.replace('s3://', '');
  
  // Split the remaining string by '/'
  let parts = newUrl.split('/');
  
  // Extract the bucket name (first part)
  let bucketName = parts.shift();
  
  // Join the remaining parts
  let key = parts.join('/');
  
  // Construct the new URL
  let fixedUrl = `https://${bucketName}.s3.us-west-2.amazonaws.com/${key}.mp4`;
  
  return fixedUrl;
}

const updateUrls = async () => {
  const { data, error } = await supabase
    .from('interview_practice_questionmodel')
    .select('id, question_url')

  if (error) console.log('Error inserting data sob:', error.message)
  else {
    for (let row of data) {
      const newUrl = fixUrl(row.question_url);
      
      const { data: updateData, error: updateError } = await supabase
        .from('interview_practice_questionmodel')
        .update({ question_url: newUrl })
        .eq('id', row.id)

      if (updateError) throw updateError;
      
      console.log(`Updated row ${row.id} with new URL: ${newUrl}`);
    }
  }
}

updateUrls()