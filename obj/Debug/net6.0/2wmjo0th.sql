IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Airports] (
    [iataCode] nvarchar(450) NOT NULL,
    [AirportName] nvarchar(max) NOT NULL,
    [icaoCode] nvarchar(max) NOT NULL,
    [AirportLocation] nvarchar(max) NOT NULL,
    [AirportType] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Airports] PRIMARY KEY ([iataCode])
);
GO

CREATE TABLE [Bookings] (
    [BookingID] int NOT NULL IDENTITY,
    [CustomerUsername] nvarchar(max) NOT NULL,
    [Date] datetime2 NOT NULL,
    [ExpiredDate] datetime2 NOT NULL,
    [TicketsQuantity] int NOT NULL,
    [PaymentStatus] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Bookings] PRIMARY KEY ([BookingID])
);
GO

CREATE TABLE [Classes] (
    [ClassID] int NOT NULL IDENTITY,
    [ClassName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Classes] PRIMARY KEY ([ClassID])
);
GO

CREATE TABLE [Customers] (
    [CustomerUsername] nvarchar(max) NOT NULL,
    [CustomerName] nvarchar(max) NOT NULL,
    [PhoneNumber] nvarchar(max) NOT NULL,
    [DoB] datetime2 NOT NULL,
    [CustomerPassword] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([CustomerUsername])
);
GO

CREATE TABLE [Flights] (
    [FlightID] int NOT NULL IDENTITY,
    [Date] datetime2 NOT NULL,
    [Duration] nvarchar(max) NOT NULL,
    [Departure] nvarchar(max) NOT NULL,
    [Destination] nvarchar(max) NOT NULL,
    [BasePrice] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Flights] PRIMARY KEY ([FlightID])
);
GO

CREATE TABLE [Passengers] (
    [PassengerID] int NOT NULL IDENTITY,
    [PassengerName] nvarchar(max) NOT NULL,
    [DateOfBirth] datetime2 NOT NULL,
    [PassportNumber] nvarchar(max) NOT NULL,
    [BookingID] int NOT NULL,
    CONSTRAINT [PK_Passengers] PRIMARY KEY ([PassengerID])
);
GO

CREATE TABLE [Tickets] (
    [TicketID] int NOT NULL IDENTITY,
    [SeatNumber] nvarchar(max) NOT NULL,
    [FlightID] int NOT NULL,
    [ClassID] int NOT NULL,
    [BookingID] int NOT NULL,
    [PassengerID] int NOT NULL,
    [TicketPrice] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Tickets] PRIMARY KEY ([TicketID])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241201152340_InitialCreate', N'6.0.36');
GO

COMMIT;
GO

