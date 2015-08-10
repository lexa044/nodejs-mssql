
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'API_GetAllProducts')
   exec('CREATE PROCEDURE [dbo].[API_GetAllProducts] AS BEGIN SET NOCOUNT ON; END')
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[API_GetAllProducts] 
AS
	SET NOCOUNT ON;

	SELECT
	   [Id]
      ,[Name]
	  ,[Description]
	FROM [dbo].[Product];
	
	SET NOCOUNT OFF;
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'API_SaveProduct')
   exec('CREATE PROCEDURE [dbo].[API_SaveProduct] AS BEGIN SET NOCOUNT ON; END')
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[API_SaveProduct]
	@inId INT,
	@inName VARCHAR(150),
	@inDescription VARCHAR(MAX)
AS
	SET NOCOUNT ON;
	
	IF (@inId = 0)
	BEGIN
		INSERT INTO [dbo].[Product] ([Name], [Description])
		VALUES(@inName, @inDescription);
		
		SET @inId = SCOPE_IDENTITY();
	END
	ELSE
	BEGIN
		UPDATE [dbo].[Product] WITH(ROWLOCK,UPDLOCK) SET 
			[Name] = @inName,
			[Description] = @inDescription
		WHERE ([Id] = @inId);
	END;

	SELECT
	   [Id]
      ,[Name]
	  ,[Description]
	FROM [dbo].[Product]
	WHERE ([Id] = @inId);
	
	SET NOCOUNT OFF;
GO
