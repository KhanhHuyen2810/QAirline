namespace WebApplication1.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.IO;

    class Program
    {
        static void Main(string[] args)
        {
            string filePath = @"SQLjson/airports.json";
            string jsonContent = File.ReadAllText(filePath);

            List<Airport> airports = JsonConvert.DeserializeObject<List<Airport>>(jsonContent);

            //foreach (var airport in airports)
            //{
            //    Console.WriteLine($"Name: {airport.Name}, IATA Code: {airport.IataCode}, Location: {airport.Location}");
            //}
        }
    }

    public class Airport
    {
        public string AirportName { get; set; }
        public string iataCode { get; set; }
        public string icaoCode { get; set; }
        public string AirportLocation { get; set; }
        public string AirportType { get; set; }
    }
}
