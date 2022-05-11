SELECT  a.answer_id
        a.question_id
        q.option_0
        q.option_1
        f.food_id
        f.co2e_per_kg
FROM answer a
JOIN question q USING (question_id)
JOIN food f USING (food_id)
