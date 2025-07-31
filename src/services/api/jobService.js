const tableName = 'job_c';

export const jobService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "clientId_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "jobType_c" } },
          { field: { Name: "salaryMin_c" } },
          { field: { Name: "salaryMax_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "requiredSkills_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "applicants_c" } }
        ],
        orderBy: [
          { fieldName: "createdAt_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching jobs:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "company_c" } },
          { field: { Name: "clientId_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "jobType_c" } },
          { field: { Name: "salaryMin_c" } },
          { field: { Name: "salaryMax_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "requiredSkills_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "applicants_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching job with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(jobData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Name: jobData.Name || jobData.title_c || jobData.title || 'Untitled Job',
            Tags: jobData.Tags || '',
            title_c: jobData.title_c || jobData.title,
            company_c: jobData.company_c || jobData.company,
            clientId_c: jobData.clientId_c ? parseInt(jobData.clientId_c) : null,
            location_c: jobData.location_c || jobData.location,
            jobType_c: jobData.jobType_c || jobData.jobType,
            salaryMin_c: jobData.salaryMin_c ? parseInt(jobData.salaryMin_c) : 
                        jobData.salaryMin ? parseInt(jobData.salaryMin) : null,
            salaryMax_c: jobData.salaryMax_c ? parseInt(jobData.salaryMax_c) : 
                        jobData.salaryMax ? parseInt(jobData.salaryMax) : null,
            experienceLevel_c: jobData.experienceLevel_c || jobData.experienceLevel,
            requiredSkills_c: jobData.requiredSkills_c || jobData.requiredSkills,
            description_c: jobData.description_c || jobData.description,
            status_c: jobData.status_c || jobData.status || 'active',
            createdAt_c: jobData.createdAt_c || new Date().toISOString(),
            applicants_c: jobData.applicants_c ? parseInt(jobData.applicants_c) : 0
          }
        ]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create job ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating job:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateRecord = {
        Id: parseInt(id)
      };

      // Only include updateable fields
      if (updateData.Name !== undefined) updateRecord.Name = updateData.Name;
      if (updateData.Tags !== undefined) updateRecord.Tags = updateData.Tags;
      if (updateData.title_c !== undefined) updateRecord.title_c = updateData.title_c;
      if (updateData.company_c !== undefined) updateRecord.company_c = updateData.company_c;
      if (updateData.clientId_c !== undefined) updateRecord.clientId_c = parseInt(updateData.clientId_c);
      if (updateData.location_c !== undefined) updateRecord.location_c = updateData.location_c;
      if (updateData.jobType_c !== undefined) updateRecord.jobType_c = updateData.jobType_c;
      if (updateData.salaryMin_c !== undefined) updateRecord.salaryMin_c = parseInt(updateData.salaryMin_c);
      if (updateData.salaryMax_c !== undefined) updateRecord.salaryMax_c = parseInt(updateData.salaryMax_c);
      if (updateData.experienceLevel_c !== undefined) updateRecord.experienceLevel_c = updateData.experienceLevel_c;
      if (updateData.requiredSkills_c !== undefined) updateRecord.requiredSkills_c = updateData.requiredSkills_c;
      if (updateData.description_c !== undefined) updateRecord.description_c = updateData.description_c;
      if (updateData.status_c !== undefined) updateRecord.status_c = updateData.status_c;
      if (updateData.createdAt_c !== undefined) updateRecord.createdAt_c = updateData.createdAt_c;
      if (updateData.applicants_c !== undefined) updateRecord.applicants_c = parseInt(updateData.applicants_c);

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update job ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating job:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete job ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting job:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};