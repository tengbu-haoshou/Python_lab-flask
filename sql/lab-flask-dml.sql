--
-- lab-flask
-- Copyright (c) 2024 Hirotoshi FUJIBE
--

-- USER_LIST

DELETE FROM LAB_FLASK.USER_LIST;
INSERT INTO LAB_FLASK.USER_LIST
	( USER_ID, USER_NAME, PASSWORD_AES, USER_DESC )
	VALUES
		( '2024-01-01T00:00:00.000000', 'root', HEX(AES_ENCRYPT('Asdf1234', 'Asdf1234Asdf1234')), 'Administrator' );

-- PRODUCT_LIST

DELETE FROM LAB_FLASK.PRODUCT_LIST;
INSERT INTO LAB_FLASK.PRODUCT_LIST
	( PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESC )
	VALUES
		( '2024-01-01T00:00:00.000001', 'Apple', 'Made in Japan.' ),
		( '2024-01-01T00:00:00.000002', 'Orange', 'Made in America.' );
