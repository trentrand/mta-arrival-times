//
//  ComplicationController.swift
//  MTA Arrival Times WatchKit Extension
//
//  Created by Trent Rand on 10/11/19.
//  Copyright © 2019 Trent Rand. All rights reserved.
//

import ClockKit


class ComplicationController: NSObject, CLKComplicationDataSource {
    
    struct Arrival {
        var time: String
        var shortName: String?
        
        var startDate: NSDate
        var length: TimeInterval
    }
    
    let hour: TimeInterval = 60 * 60
    lazy var arrivals = [
        Arrival(time: "10:03AM, 6 MINS", shortName: nil, startDate: NSDate(timeIntervalSinceNow: hour * 5.5), length: hour)
    ]
    
    // MARK: - Timeline ConfigurationH
    
    func getSupportedTimeTravelDirections(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationTimeTravelDirections) -> Void) {
        handler([.forward])
    }
    
    func getTimelineStartDate(for complication: CLKComplication, withHandler handler: @escaping (Date?) -> Void) {
        handler(nil)
    }
    
    func getTimelineEndDate(for complication: CLKComplication, withHandler handler: @escaping (Date?) -> Void) {
        handler(nil)
    }
    
    func getPrivacyBehavior(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationPrivacyBehavior) -> Void) {
        handler(.showOnLockScreen)
    }
    
    // MARK: - Timeline Population
    
    func getCurrentTimelineEntry(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationTimelineEntry?) -> Void) {
        
        let arrival = arrivals[0]
        
        // Call the handler with the current timeline entry
        switch complication.family {
        case .graphicCorner:
                
                let template = CLKComplicationTemplateGraphicCornerTextImage()
                let image = UIImage(named: "Complication/Graphic Corner")!
                template.imageProvider = CLKFullColorImageProvider(fullColorImage: image)
                template.textProvider = CLKSimpleTextProvider(text: arrival.time)
                let timelineEntry = CLKComplicationTimelineEntry(date: Date(), complicationTemplate: template)
                handler(timelineEntry)
        default:
            handler(nil)
        }
    }
    
    
    func getTimelineEntries(for complication: CLKComplication, before date: Date, limit: Int, withHandler handler: @escaping ([CLKComplicationTimelineEntry]?) -> Void) {
        // Call the handler with the timeline entries prior to the given date
        handler(nil)
    }
    
    func getTimelineEntries(for complication: CLKComplication, after date: Date, limit: Int, withHandler handler: @escaping ([CLKComplicationTimelineEntry]?) -> Void) {
        // Call the handler with the timeline entries after to the given date
        handler(nil)
    }
    
    // MARK: - Placeholder Templates
    
    func getLocalizableSampleTemplate(for complication: CLKComplication, withHandler handler: @escaping (CLKComplicationTemplate?) -> Void) {
        
        // This method will be called once per supported complication, and the results will be cached
        switch complication.family {
        case .graphicCorner:
            let template = CLKComplicationTemplateGraphicCornerTextImage()
            let image = UIImage(named: "Complication/Graphic Corner")!
            template.imageProvider = CLKFullColorImageProvider(fullColorImage: image)
            template.textProvider = CLKSimpleTextProvider(text: "10:03AM, 6 MINS")
            handler(template)
        default:
            handler(nil)
        }
    }
    
}
