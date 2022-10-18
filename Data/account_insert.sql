use OmneFictio
go


insert into [Language] values('french')
insert into [Language] values('english')

insert into [DeletedStatus] values(1, 'Alive')
insert into [DeletedStatus] values(2, 'Deleted')

insert into [PostStatus] values(1, 'Unknown1')
insert into [PostStatus] values(2, 'Unknown2')

insert into [PostType] values(1, 'Fanfiction')
insert into [PostType] values(2, 'Original')
insert into [PostType] values(3, 'Plot')
insert into [PostType] values(4, 'Scenerio')

insert into Account values(
    'İrsat',
    'Password',
    'asdf@gmail.com',
    1,
    'profilePic',
    'selfDEscccc',
    0,
    0,
    1,
    1,
    2
)

insert into Post values(
    'Bu bir başlık',
    'Bu bir açıklama. Bu bir açıklama. Bu bir açıklama. Bu bir açıklama. Bu bir açıklama. Bu bir açıklama. Bu bir açıklama. Bu bir açıklama.',
    '2022/06/06 18:17:00',
    '2022/06/06 19:17:00',
    1,
    1,
    2,
    2,
    1
)

insert into Post values(
    'Bu bir başaaaaaaalık 222',
    'Bu bi3333333333333r açıklama. Bu bir 33333çıklama. Bu b33333açıklama. Bu3333ir açıklama. Bu33333r açıklama. Bu bir açıklama. Bu bir açıklama. Bu bir açıklama.',
    '2021/06/06 18:17:00',
    '2022/06/06 19:17:00',
    1,
    1,
    2,
    2,
    1
)



ALTER TABLE Account ALTER COLUMN prefLanguageId INT NULL
update Account set prefLanguageId = 4

select * from Account
select * from Language
select * from Post

insert into [Language] values('english')
delete from [Language] where id = 3


insert into [Tag] values('Fantasy')
insert into [Tag] values('Action')
insert into [Tag] values('Romance')
insert into [Tag] values('Western')
insert into [Tag] values('Comedy')
insert into [Tag] values('Dram')


insert into [Post_Tag] values(1, 1)
insert into [Post_Tag] values(1, 2)
insert into [Post_Tag] values(1, 3)
insert into [Post_Tag] values(2, 3)
insert into [Post_Tag] values(2, 4)
insert into [Post_Tag] values(3, 4)
insert into [Post_Tag] values(3, 5)


insert into Vote values(1, 1, 1, null, null, null)
insert into Vote values(1, 0, 1, null, null, null)
insert into Vote values(1, 1, 1, null, null, null)
insert into Vote values(1, 0, 1, null, null, null)

select * from Vote