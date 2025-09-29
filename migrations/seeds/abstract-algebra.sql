insert into users (id, name, phone, password) values
(1000000, 'Ted', '+621100110011', '[redacted]'),
(1000001, 'Ron', '+621122112211', '[redacted]'),
(1000002, 'Jackson', '+621133113311', '[redacted]');

insert into groups (id, name, creator_id) values
(1000000, 'Abstract Algebra Study Group', 1000000);

INSERT INTO messages (group_id, user_id, content) VALUES
(1000000, 1000000, 'bruh this abstract algebra homework is actual torture'),
(1000000, 1000001, 'omg tell me about it'),
(1000000, 1000002, 'i''m so lost on problem 3'),
(1000000, 1000000, 'the one about cosets?'),
(1000000, 1000001, 'yeah that''s the one. what even IS a normal subgroup'),
(1000000, 1000002, 'idk man. the definition makes no sense'),
(1000000, 1000000, 'ngl i just feel like we''re moving letters around and calling it a "proof"'),
(1000000, 1000001, 'lmao fr. it''s just group G and subgroup H and a bunch of parentheses'),
(1000000, 1000002, 'i''ve been staring at the same page for an hour'),
(1000000, 1000000, 'same. my brain is just... mush'),
(1000000, 1000001, 'did anyone even go to the lecture on homomorphisms?'),
(1000000, 1000002, 'i did but my notes are just chicken scratch. something about preserving group operations?'),
(1000000, 1000000, 'lowkey think i understood it for like 5 seconds and then it was gone'),
(1000000, 1000001, 'is there a youtube video for this? there has to be'),
(1000000, 1000002, 'i tried. all the videos are by old dudes with bad microphones'),
(1000000, 1000000, 'tbf they''re probably the only ones who get this stuff'),
(1000000, 1000001, 'you''re not wrong  '),
(1000000, 1000000, 'anyone try the problem about the cyclic group?'),
(1000000, 1000001, 'that one was lit, i think i got it'),
(1000000, 1000002, 'oh word? show me'),
(1000000, 1000001, 'this is my work, but it''s probably wrong'),
(1000000, 1000000, 'dude what is that symbol'),
(1000000, 1000002, 'that''s a sad attempt at a phi symbol lol'),
(1000000, 1000001, 'shhh it''s fine. the logic is there, i swear'),
(1000000, 1000000, 'bro this is just numbers and letters and an arrow'),
(1000000, 1000002, 'this whole class feels like a fever dream'),
(1000000, 1000000, 'for real. i had a dream i was a subgroup of a ring last night'),
(1000000, 1000001, 'that''s a sign you''ve gone too deep'),
(1000000, 1000002, 'what about the final question? the one about field extensions?'),
(1000000, 1000000, 'i skipped that one. i don''t even know what a field is anymore'),
(1000000, 1000001, 'it''s like a ring but it has a multiplicative inverse?'),
(1000000, 1000002, 'so like... division?'),
(1000000, 1000000, 'yeah but you can''t say that in a proof lol'),
(1000000, 1000001, '"it''s basically just division, professor, trust me"'),
(1000000, 1000002, 'lmao i''m gonna write that down'),
(1000000, 1000000, 'this is so depressing. i need a break'),
(1000000, 1000001, 'maybe we can meet up at the library tomorrow?'),
(1000000, 1000002, 'lowkey a good idea. we can all be lost together'),
(1000000, 1000000, 'true. misery loves company'),
(1000000, 1000001, 'see you guys tomorrow'),
(1000000, 1000002, 'ya bye'),
(1000000, 1000000, 'fr'),
(1000000, 1000001, 'what time?'),
(1000000, 1000000, 'noonish? before my physics lab'),
(1000000, 1000002, 'sounds good'),
(1000000, 1000001, 'i''ll be there'),
(1000000, 1000000, 'don''t forget the snacks'),
(1000000, 1000001, 'never');

insert into notes (creator_id, content) values (
    1000002,
    '### Group Theory: First Theorems

    **Lagrange\'s Theorem**
    * This is a fundamental theorem in finite group theory.
    * It states that for any finite group $G$, the order (the number of elements) of any subgroup $H$ of $G$ must divide the order of $G$.
    * This has a really important consequence: if you have a group with a prime number of elements, it must be a cyclic group.

    **Cayley\'s Theorem**
    * Named after the mathematician Arthur Cayley.
    * It states that every group $G$ is isomorphic to a subgroup of the symmetric group on $G$.
    * What this means in plain English is that you can always represent any group as a group of permutations.
    * Great because allows us to study abstract groups by looking at more concrete objects (permutations).

    **The Isomorphism Theorems**
    * There are three main isomorphism theorems, and they relate quotient groups, homomorphisms, and subgroups.
    * The **First Isomorphism Theorem** is probably the most used one. It says that if you have a homomorphism (a structure-preserving map) $f$ from a group $G$ to a group $H$, then the quotient group $G$ divided by the kernel of $f$ is isomorphic to the image of $f$.
    * Kernel is set of elements that map to the identity.'
);